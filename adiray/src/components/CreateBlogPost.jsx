import React, { useState, useRef } from 'react';

function CreateBlogPost() {
    const [formData, setFormData] = useState({
        author: '',
        title: '',
        description: '',
        details: '',
        imageUrl: ''
    });
    
    const [errors, setErrors] = useState({
        author: false,
        title: false,
        description: false,
        details: false,
        imageUrl: false
    });

    const formRef = useRef(null); // Create a ref for the form

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let formIsValid = true;
        const newErrors = { ...errors };
        Object.keys(formData).forEach((key) => {
            if (formData[key] === '') {
                newErrors[key] = true;
                formIsValid = false;
            }
        });
        setErrors(newErrors);

        if (formIsValid) {
            try {
                const response = await fetch('https://node-js-jwt-auth.onrender.com/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Post created:', data);
                    formRef.current.reset(); 
                    window.location.href = 'http://localhost:5173/blog';
                } else {
                    console.error('Failed to create post:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <label htmlFor="author" className="font-bold">Author Name:</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className={`w-full border py-2 px-3 rounded mt-1 mb-4 ${errors.author ? 'border-red-500' : ''}`} />
                {errors.author && <p className="text-red-500">Author name is required</p>}

                <label htmlFor="title" className="font-bold">Blog Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={`w-full border py-2 px-3 rounded mt-1 mb-4 ${errors.title ? 'border-red-500' : ''}`} />
                {errors.title && <p className="text-red-500">Blog title is required</p>}

                <label htmlFor="description" className="font-bold">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className={`w-full border py-2 px-3 rounded mt-1 mb-4 resize-y ${errors.description ? 'border-red-500' : ''}`} rows="4"></textarea>
                {errors.description && <p className="text-red-500">Description is required</p>}

                <label htmlFor="details" className="font-bold">Details:</label>
                <textarea id="details" name="details" value={formData.details} onChange={handleChange} className={`w-full border py-2 px-3 rounded mt-1 mb-4 resize-y ${errors.details ? 'border-red-500' : ''}`} rows="4"></textarea>
                {errors.details && <p className="text-red-500">Details are required</p>}

                <label htmlFor="imageUrl" className="font-bold">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={`w-full border py-2 px-3 rounded mt-1 mb-4 ${errors.imageUrl ? 'border-red-500' : ''}`} />
                {errors.imageUrl && <p className="text-red-500">Image URL is required</p>}

                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Submit</button>
            </form>
        </div>
    );
}

export default CreateBlogPost;
