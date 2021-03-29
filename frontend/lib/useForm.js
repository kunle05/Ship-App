import { useEffect, useState } from "react";

const useForm = (initials = {}) => {
    const [formData, setFormData] = useState(initials);
    const initialValues = Object.values(initials).join('');

    useEffect(() => {
        setFormData(initials);
    }, [initialValues]);

    const handleChange = async e => {
        let { name, value, type } = e.target;
        if(type === 'number') {
            value = parseFloat(value);
        };
        
        if(type === 'file') {
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'shipsafe'); 
            const res = await fetch('https://api.cloudinary.com/v1_1/kunlekodes/image/upload', {method: 'POST', body: data});
            const file = await res.json();
            value = file.secure_url;
        }

        setFormData({
            ...formData, 
            [name]: value
        });
    }

    const resetForm = () => {
        setFormData(initials);
    }

    const clearForm = () => {
        for(var data in formData) {
            formData[data] = "";
        };
        setFormData({...formData});
    }

    return { formData, handleChange, resetForm, clearForm };
};

export default useForm;