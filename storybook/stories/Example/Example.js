import React, { Component } from 'react'
import data from './data/data.json'
import { Patables } from '../../../src/index'
import { Pagination, SortArrow } from 'honeybee-ui'

class ExamplePatables extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.setState(() => ({ users: data }))
  }

  render() {
    const renderTable = props => {
      return (
        <div>
          <div className='form-row mb-3'>
            <h3 className='mx-3'>Search</h3>
            <input
              className='form-control col-6'
              placeholder='Search...'
              value={props.search}
              onChange={props.setSearchTerm}
            />

            <div className='col d-flex justify-content-end'>
              <div className='form-inline'>
                <label className='my-1 mr-2'>Result set: </label>
                <select
                  className='form-control'
                  value={props.resultSet}
                  onChange={e => {
                    props.setResultSet(parseInt(e.target.value))
                  }}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
            </div>
          </div>
          <table className='table table-hover mb-4'>
            <thead className='bg-info text-white text-center'>
              <tr>
                <th name='id' onClick={props.setColumnSortToggle} style={{ width: '7%' }}>
                  id  <SortArrow name='id' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='firstname' onClick={props.setColumnSortToggle} style={{ width: '15%' }}>
                  FirstName  <SortArrow name='firstname' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='lastname' onClick={props.setColumnSortToggle} style={{ width: '15%' }}>
                  LastName  <SortArrow name='lastname' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='dob' onClick={props.setColumnSortToggle} style={{ width: '15%' }}>
                  Date Of Birth <SortArrow name='dob' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='occupation' onClick={props.setColumnSortToggle} style={{ width: '20%' }}>
                  Occupation  <SortArrow name='occupation' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='phone' onClick={props.setColumnSortToggle} style={{ width: '13%' }}>
                  Phone  <SortArrow name='phone' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {props.visibleData.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.dob}</td>
                    <td>{user.occupation}</td>
                    <td>{user.phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Pagination
            totalPage={props.totalPages}
            prevDisabled={props.prevDisabled}
            nextDisabled={props.nextDisabled}
            setPageNumber={props.setPageNumber}
            pageNumber={props.currentPage}
            paginationButtons={props.paginationButtons} />
        </div>
      )
    }

    return (
      <div className='mt-5'>
        <div className='row'>
          <div className='col-11 ml-5'>
            <div>
              <Patables
                render={renderTable}
                initialData={this.state.users}
                resultSet={5}
                sortColumn='firstname'
                sortOrder='desc'
                searchKeys={['firstname', 'lastname', 'id']}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExamplePatables
