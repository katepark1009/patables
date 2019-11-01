import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction, uriBuilder } from './utils/helpers'
import axios from 'axios'

export default class Patables extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleData: [],
      search: '',
      searchKeys: this.props.searchKeys || [],
      currentPage: this.props.startingPage || 1,
      limit: this.props.limit || 10, // this was resultSet
      sortColumn: this.props.sortColumn || '',
      sortOrder: this.props.sortOrder || 'asc',
      pageNeighbors: this.props.pageNeighbors || 2,
      totalPages: 1
    }
  }

  componentDidMount() {
    this.getVisibleData()
  }

  setSearchTerm = (e) => {
    let search = e.target.value
    this.setState(() => ({ search }))
  }

  submitSearch = () => {
    if (this.state.search) {
      this.setState({ currentPage: 1 }, this.getVisibleData)
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

  //! Should user go to page 1 if they change the result set (limit) while currentPage !== 1
  setResultSet = (value) => {
    let limit = value

    if (typeof limit === 'string') {
      limit = parseInt(limit)
    }

    this.setState({ currentPage: 1, limit }, this.getVisibleData)
  }

  getVisibleData = () => {
    let uri = this.props.url
    if (this.state.currentPage) { uri = uriBuilder(uri, 'page', this.state.currentPage) }
    if (this.state.limit) { uri = uriBuilder(uri, 'limit', this.state.limit) }
    if (this.state.search) { uri = uriBuilder(uri, 'term', this.state.search) }
    console.log('uri', uri, 'search', this.state.search)

    axios.get(uri, this.props.headers)
      .then(response => {
        console.log('jokes from API', response)
        this.setState({
          visibleData: response.data.results,
          totalPages: response.data.total_pages
        })
      })
      .catch(err => console.error(err))
  }

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

Patables.propTypes = {
  visibleData: PropTypes.array,
  children: PropTypes.func,
  render: PropTypes.func,
  startingPage: PropTypes.number,
  sortColumn: PropTypes.string,
  sortOrder: PropTypes.string,
  pageNeighbors: PropTypes.number,
  searchKeys: PropTypes.array,
  url: PropTypes.string,
  headers: PropTypes.object,
  limit: PropTypes.number
}
