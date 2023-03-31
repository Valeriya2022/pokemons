import { Input, Space, Tag } from 'antd';
import pokeTypes from '@/constants';

const { CheckableTag } = Tag;

type SearchAndFilter = {
  selectedTypes: string[];
  setSelectedTypes: (arg1: string[]) => void;
  setSearchString: (arg1: string) => void;
};

export default function SearchAndFilter({
  selectedTypes,
  setSelectedTypes,
  setSearchString
}: SearchAndFilter) {
  const handleChange = (type: string, checked: boolean) => {
    const nextSelectedTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    setSelectedTypes(nextSelectedTypes);
  };

  return (
    <>
      <Input
        style={{
          maxWidth: '90vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          marginTop: '20px'
        }}
        placeholder="Search..."
        onChange={e => setSearchString(e.target.value)}
      />
      <Space
        style={{
          width: '90vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          marginTop: '20px'
        }}
        wrap
      >
        {pokeTypes.map(type => (
          <CheckableTag
            key={type}
            checked={selectedTypes.includes(type)}
            onChange={checked => handleChange(type, checked)}
          >
            {type}
          </CheckableTag>
        ))}
      </Space>
    </>
  );
}
