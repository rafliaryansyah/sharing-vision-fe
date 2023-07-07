/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Button, FormGroup } from 'reactstrap'
import PropTypes from 'prop-types'
import { deleteArticle, getArticles, pageLoading, showPopup } from 'src/services'

const Articles = ({ history }) => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/article')
      .then((response) => response.json())
      .then((data) => setArticles(data.data))
      .catch((error) => console.log(error))
  }, [])

  const handlePressEdit = articleId => {
    window.location.href = `#/article/edit/${articleId}`
  }

  const handlePressDelete = (articleData) => {
    // Menggunakan window.confirm untuk memunculkan popup konfirmasi
    if (window.confirm('Are you sure you want to delete this article?')) {
      submitDelete(articleData);
    }
  };

  const submitDelete = async (articleData) => {
    try {
      pageLoading(true);
      await deleteArticle(articleData);
      await getArticles()
      pageLoading(false);
      showPopup({
        title: 'Completed!',
        message: 'Berhasil menghapus artikel.',
      });
    } catch (err) {
      pageLoading(false);
      showPopup({
        title: 'Error!',
        message: err?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <small>Retrieve a list of Articles.</small>
          </CCardHeader>
          <CCardBody>
            <FormGroup>
              <Button onClick={() => window.location.href = '#/article/create' } color="primary">Create Article</Button>
            </FormGroup>
            <DocsExample href="components/table">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.map((article, index) => (
                    <CTableRow>
                      <CTableHeaderCell scope="row" key={article.id}>
                        {index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell>{article.title}</CTableDataCell>
                      <CTableDataCell>{article.category}</CTableDataCell>
                      <CTableDataCell>{article.status}</CTableDataCell>
                      <CTableDataCell>
                        <Button onClick={() => handlePressEdit(article.id)} color="primary" style={{ margin: '8px' }}>Edit</Button>
                        <Button onClick={() => handlePressDelete(article.id)} color="danger" className="ml-2" style={{ color: 'white' }}>Delete</Button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </DocsExample>
            <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous" disabled>
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem active>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Articles.propTypes = {
  history: PropTypes.object.isRequired
}

export default Articles