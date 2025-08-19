import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const LanguageSetting = () => {
    const [lang, setLang] = useState('en');
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4">
            <span className="font-semibold">Language:</span>
            <Select value={lang} onChange={setLang} className="w-full">
                <Option value="en">English</Option>
                <Option value="vi">Vietnamese</Option>
            </Select>
        </div>
    );
};

export default LanguageSetting;
