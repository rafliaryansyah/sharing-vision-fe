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
import { Button, FormGroup } from 'reactstrap'
import { deleteArticle, getArticles, pageLoading, showPopup } from 'src/services'
import { useNavigate } from 'react-router-dom'

const Articles = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState(undefined);

  const history = useNavigate()
  const [articles, setArticles] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArticles(currentPage, filterStatus); // Menggunakan getArticles tanpa paginasi
        const data = response.data;
        setArticles(data);
        setRefreshData(false)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [currentPage, refreshData, filterStatus]);

  const handlePressEdit = articleId => {
    history(`/article/edit/${articleId}`);
  }

  const submitDelete = async articleId => {
    try {
      pageLoading(true);
      await deleteArticle(articleId);
      await getArticles(currentPage);
      pageLoading(false);
      showPopup({
        title: 'Completed!',
        message: 'Data was removed from table'
      })
      setRefreshData(true)
    } catch (err) {
      pageLoading(false);
      showPopup({
        title: 'Error!',
        message: err?.message || 'Something Wrong!'
      })
    }

  }    

  const handlePressDelete = id => {
    showPopup({
      title: 'Warning!',
      message: (
        <p>Wanna to delete article from table?</p>
      ),
      leftButtonTitle: 'Yes',
      rightButtonTitle: 'No',
      onPressLeft: () => submitDelete(id),
      onPressRight: () => { }
    });
  }

  const handlePageClick = page => {
    console.log('handlePageClick => ', page)
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const totalPages = 10; // Jumlah total halaman yang tersedia
    const paginationRange = 3; // Jumlah nomor halaman yang ditampilkan di preview

    const start = Math.max(1, currentPage - paginationRange);
    const end = Math.min(totalPages, currentPage + paginationRange);

    const paginationItems = [];

    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <CPaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </CPaginationItem>
      );
    }

    return paginationItems;
  };

  const handleButtonFilter = (status) => {
    setFilterStatus(status)
    setCurrentPage(1)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <small>Retrieve a list of Articles.</small>
          </CCardHeader>
          <CCardBody>
            <FormGroup>
              <Button onClick={() => history(`/article/create`)} color="primary">Create Article</Button>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => handleButtonFilter()} color="primary" className='m-2'>All status</Button>
              <Button onClick={() => handleButtonFilter('Publish')} color="primary" className='m-2'>Publish</Button>
              <Button onClick={() => handleButtonFilter('Draft')} color="secondary" className='m-2'>Draft</Button>
              <Button onClick={() => handleButtonFilter('Thrash')} color="danger" className='m-2'>Thrash</Button>
            </FormGroup>
            <FormGroup>
            </FormGroup>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="Title">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="Category">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="Status">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="Action">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.map((article, index) => (
                    <CTableRow key={article.id}>
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
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                aria-label="Previous"
                onClick={() =>
                  handlePageClick(Math.max(currentPage - 1, 1))
                }
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {renderPaginationItems()}
              <CPaginationItem
                aria-label="Next"
                onClick={() =>
                  handlePageClick(Math.min(currentPage + 1, 10))
                }
                disabled={currentPage === -1}
              >
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Articles