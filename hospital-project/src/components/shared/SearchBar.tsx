import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

const SearchBar = ({ placeholder = 'Tìm kiếm...', onSearch, className = '' }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default SearchBar;
