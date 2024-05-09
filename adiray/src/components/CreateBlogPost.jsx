import { useState } from "react";
function CreateBlogPost() {
    const [formData, setFormData] = useState({
        author: '',
        title: '',
        description: '',
        details: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <label htmlFor="author" className="font-bold">Author Name:</label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="w-full border py-2 px-3 rounded mt-1 mb-4" />

                <label htmlFor="title" className="font-bold">Blog Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border py-2 px-3 rounded mt-1 mb-4" />

                <label htmlFor="description" className="font-bold">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border py-2 px-3 rounded mt-1 mb-4 resize-y" rows="4"></textarea>

                <label htmlFor="details" className="font-bold">Details:</label>
                <textarea id="details" name="details" value={formData.details} onChange={handleChange} className="w-full border py-2 px-3 rounded mt-1 mb-4 resize-y" rows="4"></textarea>

                <label htmlFor="imageUrl" className="font-bold">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border py-2 px-3 rounded mt-1 mb-4" />

                <button type="submit"  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Submit</button>

            </form>
        </div>
    );
}

export default CreateBlogPost;
