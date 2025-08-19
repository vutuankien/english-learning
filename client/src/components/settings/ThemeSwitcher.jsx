
import { Select } from 'antd';
import { useTheme } from '../../context/ThemeContext';

const { Option } = Select;

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4">
            <span className="font-semibold">Choose Theme:</span>
            <Select value={theme} onChange={setTheme} className="w-full">
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
                <Option value="blue">Blue</Option>
            </Select>
            <div className={`h-16 rounded-lg ${theme === 'blue' ? 'bg-blue-500' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
        </div>
    );
};

export default ThemeSwitcher;
