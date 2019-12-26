import React, { Component } from 'react'
import props from './data/props.json'
import { Patables } from '../../../src/index'
import { Pagination, SortArrow } from 'honeybee-ui'

class Props extends Component {
  constructor(props) {
    super(props)

    this.state = {
      props: []
    }
  }

  componentDidMount() {
    this.setState(() => ({ props: props }))
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
            <thead className='bg-primary text-white text-center'>
              <tr>
                <th name='prop' onClick={props.setColumnSortToggle} style={{ width: '20%' }}>
                  Prop  <SortArrow name='prop' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='type' onClick={props.setColumnSortToggle} style={{ width: '20%' }}>
                  Type  <SortArrow name='type' sortColumn={props.sortColumn} sortOrder={props.sortOrder} />
                </th>
                <th name='link' style={{ width: '15%' }}>Link to docs</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {props.visibleData.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.prop}</td>
                    <td>{v.type}</td>
                    <td><a className='btn btn-outline-info' href={v.link} target='_blank' rel='noreferrer noopener'>More info</a></td>
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
                initialData={this.state.props}
                resultSet={10}
                sortColumn='prop'
                sortOrder='asc'
                searchKeys={['prop']}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Props
