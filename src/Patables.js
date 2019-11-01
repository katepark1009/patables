import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual, isFunction, uriBuilder } from './utils/helpers'
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
      // totalPages: Math.ceil(this.props.initialData.length / this.props.resultSet),
      initialData: this.props.initialData || [], //! not getting initial Data from App anymore.
      sortColumn: this.props.sortColumn || '',
      sortOrder: this.props.sortOrder || 'asc',
      pageNeighbors: this.props.pageNeighbors || 2,
      page: '',
      range: [],
      totalPages: 1
    }
  }
  /* 
  ? mock data from server :  URL ( icanhazdadjoke.com/search )
   {
     "current_page": 1,
     "limit": 20,
     "next_page": 2,
     "previous_page": 1,
     "results": [
         {
             "id": "0189hNRf2g",
             "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
         },
         {
             "id": "08EQZ8EQukb",
             "joke": "Did you hear about the guy whose whole left side was cut off? He's all right now."
         }
     ],
     "search_term": "",
     "status": 200,
     "total_jokes": 576,
     "total_pages": 28
   }
  
  ? query parameters
   page - which page of results to fetch (default: 1) => icanhazdadjoke.com/search?page=3
   limit - number of results to return per page (default: 20) (max: 30) =>  icanhazdadjoke.com/search?term=dad&limit=2
   term - search term to use (default: list all jokes) => icanhazdadjoke.com/search?term=dad
  */

 //! fetch data for the first page
  // url: this.props.url,
  // LIFECYCLE METHODS
  componentDidMount() {
    this.getVisibleData()
  }

  //! check if visibleData changed
  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
    if (prevState.limit !== this.state.limit) {
      this.getVisibleData()
    }
  }

  //! SEARCHING - add a submit button to getVisibleData with search term
  setSearchTerm = (e) => {
    let search = e.target.value
    this.setState(() => ({ search }))
  }

  submitSearch = () => {
    console.log('hi submit')
    this.getVisibleData()
  }

  //! add a method for submitSearchTerm
  // searchFilter(arr, searchTerm, searchkeys) {
  //   // if searchkeys aren't provided use the keys off the first object in array by default
  //   let searchKeys = searchkeys.length === 0 ? Object.keys(arr[0]) : searchkeys
  //   let filteredArray = arr.filter((obj) => {
  //     return searchKeys.some((key) => {
  //       if (obj[key] === null || obj[key] === undefined) { return false }
  //       return obj[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
  //     })
  //   })

  //   // Resetting the total pages based on filtered data
  //   let totalPages = Math.ceil(filteredArray.length / this.state.resultSet)
  //   console.log('totalPages: ', totalPages)
  //   console.log('filteredArray: ', filteredArray)
  //   if (totalPages !== this.state.totalPages) {
  //     this.setState(() => ({ totalPages, currentPage: 1 }))
  //   }

  //   return filteredArray
  // }

  //! SORTING - BE work - setColumnSortToggle will toggle 'asc' and 'desc' in state and getVisibleData will fire
  // sortByColumn(array) {
  //   let order = this.state.sortOrder.toLowerCase()

  //   return array.sort((a, b) => {
  //     var x = a[this.state.sortColumn]
  //     var y = b[this.state.sortColumn]

  //     if (typeof x === 'string') { x = ('' + x).toLowerCase() }
  //     if (typeof y === 'string') { y = ('' + y).toLowerCase() }

  //     if (order === 'desc') {
  //       return ((x < y) ? 1 : ((x > y) ? -1 : 0))
  //     } else {
  //       return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  //     }
  //   })
  // }

  // setColumnSortToggle(e) {
  //   let sortColumn = e.target.getAttribute('name')
  //   let sortOrder = this.state.sortOrder
  //   if (sortColumn === this.state.sortColumn) {
  //     sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
  //   } else {
  //     sortOrder = 'asc'
  //   }
  //   this.setState(() => ({ sortColumn, sortOrder }))
  // }

  //? User click the Pagination number will fire this func
  // onClick={() => { this.props.setPageNumber(1) }}> 
  // CURRENT PAGE
  setPageNumber = (currentPage) => {
    this.setState(() => ({ currentPage }))
  }

  //! RESULT SET AKA LIMIT, set limit (resultSet) in state and call getVisibleData
  setResultSet = (value) => {
    let limit = value

    if (typeof limit === 'string') {
      limit = parseInt(limit)
    }
    //? We can get total pages from fetch data 
    this.setState({ limit })
  }

  //! THIS IS THE CORE OF PATABLES2.0 - this should fire another fetch call with query params for BE.
  // VISIBLE DATA
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

  //! PAGINATION data to come from BE
  //! store range as array of page numbers in state, gets passed as props to Pagination. getVisibleDate to call range()
  // range = (start, end, step = 1) => {
  //   let i = start
  //   const range = []

  //   while (i <= end) {
  //     range.push(i)
  //     i += step
  //   }

  //   return range
  // }

  // getPagination() {
  //   const { currentPage, totalPages, pageNeighbors } = this.state // 1, 10, 2
  //   const totalNumbers = (pageNeighbors * 2) + 1 // 5
  //   let pages = []

  //   if (totalPages > totalNumbers) {
  //     let startPage, endPage

  //     if (currentPage <= (pageNeighbors + 1)) {
  //       startPage = 1
  //       endPage = (pageNeighbors * 2) + 1
  //     } else if (currentPage > (totalPages - pageNeighbors)) {
  //       startPage = totalPages - ((pageNeighbors * 2))
  //       endPage = totalPages
  //     } else {
  //       startPage = currentPage - pageNeighbors
  //       endPage = currentPage + pageNeighbors
  //     }

  //     pages = this.range(startPage, endPage)
  //   } else {
  //     pages = this.range(1, totalPages)
  //   }

  //   return pages
  // }

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
      submitSearch: this.submitSearch
      // visibleData: this.getVisibleData(), // this is just gonna be part of state
      // paginationButtons: this.getPagination(), // range will be in state also
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

// Patables.propTypes = {
//   visibleData: PropTypes.array,
//   children: PropTypes.func,
//   initialData: PropTypes.array.isRequired,
//   resultSet: PropTypes.number,
//   startingPage: PropTypes.number,
//   sortColumn: PropTypes.string,
//   sortOrder: PropTypes.string,
//   pageNeighbors: PropTypes.number,
//   searchKeys: PropTypes.array,
//   url: PropTypes.string,
//   header: PropTypes.string,
//   page: PropTypes.string,
//   limit: PropTypes.string
// }
