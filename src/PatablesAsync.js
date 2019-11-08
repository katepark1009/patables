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
      sortOrder: this.props.orderByParam? this.props.orderByParam[1] : 'asc',
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
    if (this.props.searchParam[0]) {
      uri = uriBuilder(uri, this.props.searchParam[0], !this.state.search ? this.props.searchParam[1] : this.state.search)
    }
    if (this.props.apiKey) {
      uri = uriBuilder(uri, this.props.apiKey[0], this.props.apiKey[1])
    }
    if (this.props.sortParam) {
      uri = uriBuilder(uri, this.props.sortParam[0], this.props.sortParam[1])
    }
    if (this.props.orderByParam) {
      uri = uriBuilder(uri, this.props.orderByParam[0], this.state.sortOrder)
    }
    console.log('PatablesAsync uri', uri)
    this.setState({ isLoading: true }, () => {
      axios.get(uri, this.props.config)
        .then(response => {
          console.log('PatablesAsync jokes from API', response)

          let finalData = { ...response } // loop over dataPath to access the data at the correct location
          this.props.dataPath && this.props.dataPath.forEach(key => {
            finalData = finalData[key]
          })
          console.log('finalRes', finalData)

          let finalPageTotal = { ...response }
          if (this.props.pageTotalPath) { // if an array is passed in as pageTotalPath, loop over pageTotalPath to access page total
            this.props.pageTotalPath.forEach(key => {
              finalPageTotal = finalPageTotal[key]
            })
          }
          console.log('final page total', finalPageTotal)

          this.setState((prevState) => ({
            visibleData: finalData,
            totalPages: typeof finalPageTotal !== 'number' ? prevState.totalPages : finalPageTotal
          }))
        })
        .catch(err => {
          console.error('error:', err)
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    })
  }

  // SORT ORDER
  setColumnSortToggle = (e) => {
    let sortColumn = e.target.getAttribute('name')
    let sortOrder = this.state.sortOrder
    if (sortColumn === this.state.sortColumn) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      sortOrder = 'asc'
    }
    this.setState(() => ({ sortColumn, sortOrder }), this.getVisibleData)
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
      console.warn('Cannot search without searchParam.')
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
  dataPath: PropTypes.array,
  apiKey: PropTypes.array,
  pageTotalPath: PropTypes.array,
  pageParam: PropTypes.string,
  limitParam: PropTypes.string,
  searchParam: PropTypes.array,
  orderByParam: PropTypes.array,
  sortParam: PropTypes.array
}
