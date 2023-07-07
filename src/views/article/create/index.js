/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { Button, Form, FormGroup, FormText } from 'reactstrap';
import { createArticle, getArticleById, showPopup, updateArticle } from 'src/services';

const CreateArticle = ({ history, match }) => {

    const articleId = match?.params?.articleId;
    const isEdit = articleId ? true : false;
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '',
        status: ''
    })
    const [loading, setLoading] = useState(false);
    const handleChangeInput = e => {
        const { name, value } = e.target;
        setForm(value, name);
    }
    const [error, setError] = useState({
        title: '',
        content: '',
        category: '',
        status: ''
    });
    const validation = () => {
        let hasError = false;

        Object.keys(error).forEach(field => {
            let fieldError = false;
            if (!form[field]) {
                hasError = true;
                fieldError = true;
                setError(`${field} is required`, field);
            }

            if (form[field] && (field === 'title') && form[field].length < 20) {
                hasError = true;
                fieldError = true;
                setError(`${field} minimum 20 characters`, field);
            }

            if (form[field] && (field === 'content') && form[field].length < 200) {
                hasError = true;
                fieldError = true;
                setError(`${field} minimum 200 characters`, field);
            }

            if (form[field] && (field === 'category') && form[field].length < 3) {
                hasError = true;
                fieldError = true;
                setError(`${field} minimum 3 characters`, field);
            }

            if (form[field] && field === 'status') {
                const validOptions = ["Publish", "Draft", "Thrash"];
                if (!validOptions.includes(form[field])) {
                    hasError = true;
                    fieldError = true;
                    setError(`Opsi ${field} tidak valid`, field);
                }
            }

            if (!fieldError) {
                setError('', field);
            }
        })
        return hasError;
    }

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
                await createArticle(form);
            }
            setLoading(false);

            if (!isEdit) {
                setForm({
                    title: '',
                    content: '',
                    category: '',
                    status: '',
                })
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
            console.log('getArticleById => ', data)
            setLoading(false);
            setForm({
                title: data?.title,
                content: data?.content,
                category: data?.category,
                status: data?.status,
            }, 'multiple')
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
            getArticleById()
        }
    }, [getArticleData, articleId])
    console.log('LMAOOOOOOO', 'EDIT', 'CREATE', form, getArticleById(articleId))
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
                                    <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                                    <CFormInput
                                        value={form.title}
                                        onChange={handleChangeInput}
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="e.g: Lorem ipsum doler si amet"
                                    />
                                    {error.name && (
                                        <FormText color="danger">{error.title}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlTextarea1">Content</CFormLabel>
                                    <CFormTextarea value={form.content} onChange={handleChangeInput} id="exampleFormControlTextarea1" rows="3" placeholder="LMAO"></CFormTextarea>
                                    {error.content && (
                                        <FormText color="danger">{error.content}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                                    <CFormInput
                                        value={form.category}
                                        onChange={handleChangeInput}
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
                                    <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                                    <CFormSelect value={form.status} onChange={handleChangeInput} className="mb-3" aria-label="Small select example">
                                        <option>Open this select menu</option>
                                        <option value="Publish">Publish</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Thrash">Thrash</option>
                                    </CFormSelect>
                                    {error.status && (
                                        <FormText color="danger">{error.status}</FormText>
                                    )}
                                </div>
                            </FormGroup>
                            <Button disabled={loading} color="success" className="mr-2">SS</Button>
                            <Button type='button' color="danger" className="ml-2" style={{ color: 'white' }}>Cancel</Button>
                        </Form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

CreateArticle.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}

export default CreateArticle
