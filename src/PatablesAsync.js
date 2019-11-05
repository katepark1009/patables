import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction, uriBuilder } from './utils/helpers'
import axios from 'axios'

export default class PatablesAsync extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleData: [],
      search: '',
      searchKeys: this.props.searchKeys || [],
      currentPage: this.props.startingPage || 1,
      resultSet: this.props.resultSet || 5,
      sortColumn: this.props.sortColumn || '',
      sortOrder: this.props.sortOrder || 'asc',
      pageNeighbors: this.props.pageNeighbors || 2,
      totalPages: 1,
      isLoading: false
    }
  }

  componentDidMount() {
    this.getVisibleData()
  }

  getVisibleData = () => {
    let uri = this.props.url
    if (this.props.pageParam) {
      uri = uriBuilder(uri, this.props.pageParam, this.state.currentPage)
    } else {
      console.warn(`pageParam not provided. pageParam:${this.props.pageParam}`)
    }
    if (this.props.limitParam) {
      uri = uriBuilder(uri, this.props.limitParam, this.state.resultSet)
    } else {
      console.warn(`limitParam not provided. limitParam:${this.props.limitParam}`)
    }
    if (this.props.searchParam) {
      uri = uriBuilder(uri, this.props.searchParam, this.state.search)
    }

    console.log('PatablesAsync uri', uri)
    this.setState({ isLoading: true }, () => {
      axios.get(uri, this.props.config)
        .then(response => {
          console.log('PatablesAsync jokes from API', response)
          this.setState({
            visibleData: response.data.results, //! from props?
            totalPages: response.data.total_pages
          })
        })
        .catch(err => {
          console.error('error:', err)
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    })
  }

  // SEARCH BOX
  setSearchTerm = (e) => {
    let search = e.target.value
    this.setState(() => ({ search }))
  }

  submitSearch = () => {
    if (this.state.search && this.props.searchParam) {
      this.setState({ currentPage: 1 }, this.getVisibleData)
    } else {
      console.warn('cannot search without searchParam')
    }
  }

  clearSearch = () => {
    this.setState({
      search: '',
      currentPage: 1
    }, this.getVisibleData)
  }

  // CURRENT PAGE
  setPageNumber = (currentPage) => {
    this.setState(() => ({ currentPage }), this.getVisibleData)
  }

  // RESULT SET AKA LIMIT
  setResultSet = (value) => {
    let resultSet = value

    if (typeof resultSet === 'string') {
      resultSet = parseInt(resultSet)
    }

    this.setState({ currentPage: 1, resultSet }, this.getVisibleData)
  }

  // GENERATE AN ARRAY OF PAGES
  range = (start, end, step = 1) => {
    let i = start
    const range = []

    while (i <= end) {
      range.push(i)
      i += step
    }

    return range
  }

  getPagination() {
    const { currentPage, totalPages, pageNeighbors } = this.state
    const totalNumbers = (pageNeighbors * 2) + 1
    let pages = []

    if (totalPages > totalNumbers) {
      let startPage, endPage

      if (currentPage <= (pageNeighbors + 1)) {
        startPage = 1
        endPage = (pageNeighbors * 2) + 1
      } else if (currentPage > (totalPages - pageNeighbors)) {
        startPage = totalPages - ((pageNeighbors * 2))
        endPage = totalPages
      } else {
        startPage = currentPage - pageNeighbors
        endPage = currentPage + pageNeighbors
      }

      pages = this.range(startPage, endPage)
    } else {
      pages = this.range(1, totalPages)
    }

    return pages
  }

  // CREATING PROPS
  getRenderProps = () => {
    return {
      ...this.state,
      setColumnSortToggle: this.setColumnSortToggle,
      setPageNumber: this.setPageNumber,
      setResultSet: this.setResultSet,
      setSearchTerm: this.setSearchTerm,
      nextDisabled: this.state.totalPages === this.state.currentPage,
      prevDisabled: this.state.currentPage === 1,
      submitSearch: this.submitSearch,
      clearSearch: this.clearSearch,
      paginationButtons: this.getPagination()
    }
  }

  render() {
    const { children, render } = this.props
    const renderProps = this.getRenderProps()

    const renderComp = () => {
      if (render && isFunction(render)) {
        return render(renderProps)
      } else if (children && isFunction(children)) {
        return children(renderProps)
      } else {
        console.warn('Please provide a valid render prop or child.')
        return undefined
      }
    }

    return (
      <div>
        {renderComp()}
      </div>
    )
  }
}

PatablesAsync.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  visibleData: PropTypes.array,
  searchKeys: PropTypes.array,
  startingPage: PropTypes.number,
  resultSet: PropTypes.number,
  sortColumn: PropTypes.string,
  sortOrder: PropTypes.string,
  pageNeighbors: PropTypes.number,
  url: PropTypes.string,
  config: PropTypes.object,
  pageParam: PropTypes.string,
  limitParam: PropTypes.string,
  searchParam: PropTypes.string
}
