import React, { Component } from 'react'
import PatablesAsync from './PatablesAsync-copy' // should be replaced later
import { Loading, SortArrow } from 'honeybee-ui'

class ExamplePatablesAsync extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  render() {
    const renderTable = props => {
      console.log('5) props from PatablesAsync:', props);
      return (
        <div>
          <div className='form-row mb-3'>
            <h3 className='mx-3'>Search</h3>
            <input
              className='form-control col-5'
              placeholder='Search for title...'
              value={props.search}
              onChange={props.setSearchTerm}
            />
            <button className='btn btn-info ml-2' onClick={props.submitSearch}>Submit</button>
            <button className='btn btn-link ml-2' onClick={props.clearSearch}>Reset</button>

            <div className='col d-flex justify-content-end'>
              <div className='form-inline'>
                <label className='my-1 mr-2'>Result set: </label>
                <select
                  className='form-control'
                  value={props.limit}
                  onChange={e => {
                    props.setResultSet(parseInt(e.target.value))
                  }}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
            </div>
          </div>
          <table className='table table-hover mb-4'>
            <thead className='bg-info text-white text-center'>
              <tr>
                <th name='title' onClick={props.setColumnSortToggle} style={{ width: '20%' }}>
                  Title <SortArrow name='title' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='rating' onClick={props.setColumnSortToggle} style={{ width: '8%' }}>
                  Rating <SortArrow name='rating' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='year' onClick={props.setColumnSortToggle} style={{ width: '8%' }}>
                  Year <SortArrow name='year' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='thumbnail' style={{ width: '10%' }}>
                  Thumbnail
                </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {props.isLoading
                ? <tr><td colSpan='4'><Loading /></td></tr>
                : !props.isLoading && !props.visibleData
                  ? <tr>
                    <td>No result</td>
                  </tr>
                  : props.visibleData.map((movie, i) => {
                    return (
                      <tr key={i}>
                        <td>{movie.title}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.year}</td>
                        <td><img src={`${movie.small_cover_image}`} /></td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div className='my-5'>
        <div className='row'>
          <div className='col-10 ml-5'>
            <div>
              <PatablesAsync
                render={renderTable}
                pageParam={['page_number']}
                limitParam={['limit', 5]}
                orderByParam={['order_by', 'desc']}
                searchParam={['query_term', '']}
                sortParam={['sort_by', 'rating']}
                url='https://yts.lt/api/v2/list_movies.json?'
                config={{
                  headers: {
                    Accept: 'application/json'
                  }
                }}
                pathToData={['data', 'data', 'movies']}
                pathToPageTotal={['data', 'data', 'movie_count']}
                showURI
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamplePatablesAsync
