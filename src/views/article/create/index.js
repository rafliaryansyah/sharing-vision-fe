/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CRow
} from '@coreui/react'
import { Button, Form, FormGroup, FormText } from "reactstrap";
import { createArticle, getArticleById, showPopup, updateArticle } from 'src/services';
import { useNavigate, useParams } from 'react-router-dom';

const CreateArticle = () => {

    const history = useNavigate()
    const { articleId } = useParams();
    const isEdit = articleId ? true : false;
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '',
        status: ''
    });
    const [loading, setLoading] = useState(false);
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
    const [error, setError] = useState({
        title: '',
        content: '',
        category: '',
        status: ''
    });
    const validation = () => {
        let isError = false;
        const newError = {
            title: '',
            content: '',
            category: '',
            status: ''
        };

        if (!form.title) {
            newError.title = 'Title is required';
            isError = true;
        } else if (form.title.length < 20) {
            newError.title = 'Title must be at least 20 characters';
            isError = true;
        }

        if (!form.content) {
            newError.content = 'Content is required';
            isError = true;
        } else if (form.content.length < 200) {
            newError.content = 'Content must be at least 200 characters';
            isError = true;
        }

        if (!form.category) {
            newError.category = 'Category is required';
            isError = true;
        } else if (form.category.length < 3) {
            newError.category = 'Category must be at least 3 characters';
            isError = true;
        }

        if (!form.status) {
            newError.status = 'Status is required';
            isError = true;
        } else if (!['publish', 'draft', 'thrash'].includes(form.status.toLowerCase())) {
            newError.status = 'Invalid status value';
            isError = true;
        }

        setError(newError);
        return isError;
    };

    const handlePressCancel = () => {
        if (isEdit) {
            return showPopup({
                title: 'Warning!',
                message: 'Are you sure you cancel?',
                leftButtonTitle: 'Yes',
                rightButtonTitle: 'No',
                onPressLeft: () => history('/article'),
                onPressRight: () => { }
            })
        }
        if (form.title || form.content || form.category || form.status) {
            return showPopup({
                title: 'Warning!',
                message: 'Are you sure you cancel? the data will be lost',
                leftButtonTitle: 'Yes',
                rightButtonTitle: 'No',
                onPressLeft: () => history('/article'),
                onPressRight: () => { }
            })
        }
        return history('/article')
    };

    const handleSubmitForm = async e => {
        if (e) e.preventDefault();

        const isError = validation();

        if (isError) {
            return;
        }

        try {
            setLoading(true);
            if (isEdit) {
                await updateArticle(articleId, form);
            } else {
                await createArticle(JSON.stringify(form));
                // history.push('#/article')
            }
            setLoading(false);

            if (!isEdit) {
                setForm({
                    title: '',
                    content: '',
                    category: '',
                    status: '',
                }, 'reset')
            }
            showPopup({
                title: 'Completed!',
                message: 'Data has saved!'
            })
        } catch (err) {
            setLoading(false);
            showPopup({
                title: 'Error!',
                message: err?.message || 'Something Wrong'
            });
        }
    };

    const getArticleData = useCallback(() => {
        setLoading(true);
        getArticleById(articleId).then(data => {
            setLoading(false);
            setForm({
                title: data?.title,
                content: data?.content,
                category: data?.category,
                status: data?.status,
            })
        }).catch(err => {
            setLoading(false);
            showPopup({
                title: 'Error!',
                message: err?.message || 'Something Wrong'
            });
            history.replace('/article')
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId])

    useEffect(() => {
        if (articleId) {
            getArticleData()
        }
    }, [getArticleData, articleId])
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <small>{isEdit ? 'Edit Article' : 'Create a new Article'}</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form onSubmit={handleSubmitForm}>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="title">Title</CFormLabel>
                                    <CFormInput
                                        value={form.title}
                                        name="title"
                                        onChange={handleChangeInput}
                                        autoComplete='off'
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="e.g: Lorem ipsum doler si amet"
                                    />
                                    {error.title && (
                                        <FormText color="danger">{error.title}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="content">Content</CFormLabel>
                                    <CFormTextarea name="content" value={form.content} onChange={handleChangeInput} id="exampleFormControlTextarea1" rows="3" placeholder="LMAO"></CFormTextarea>
                                    {error.content && (
                                        <FormText color="danger">{error.content}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="category">Category</CFormLabel>
                                    <CFormInput
                                        name="category"
                                        value={form.category}
                                        onChange={handleChangeInput}
                                        autoComplete='off'
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="e.g: Lorem ipsum doler si amet"
                                    />
                                    {error.category && (
                                        <FormText color="danger">{error.category}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="status">Status</CFormLabel>
                                    <CFormSelect name="status" value={form.status} onChange={handleChangeInput} className="mb-3" aria-label="Small select example">
                                        <option>Open this select menu</option>
                                        <option value="Publish">Publish</option>
                                        <option value="Draft">Draft</option>
                                    </CFormSelect>
                                    {error.status && (
                                        <FormText color="danger">{error.status}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <Button disabled={loading} type='submit' color="success" className="mr-2">{loading ? 'Saving...' : 'Save'}</Button>
                            <Button disabled={loading}  onClick={handlePressCancel} type='button' color="danger" className="ml-2" style={{ color: 'white' }}>Cancel</Button>
                        </Form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CreateArticle
