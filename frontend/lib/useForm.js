import { useState } from "react";

const useForm = (initials = {}) => {
    const [formData, setFormData] = useState(initials);

    const handleChange = e => {
        let { name, value, type } = e.target;
        if(type === 'number') {
            value = parseFloat(value);
        };
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
