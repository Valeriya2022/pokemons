import { Layout, Pagination, Space } from 'antd';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCurrentPage, setCurrentPage } from '@/redux/slices/pageSlice';
import { Pokemon } from '@/types/pokemons';

const { Footer } = Layout;

type PokemonPaginationType = {
  setPokemonList: (arg1: Pokemon[]) => void;
  allPokemons: Pokemon[];
};

export default function PokemonPagination({
  setPokemonList,
  allPokemons
}: PokemonPaginationType) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);

  const handlePageChange = (page, size) => {
    const offset = (page - 1) * size;
    dispatch(
      setCurrentPage({
        currentPage: page,
        limit: size,
        offset: offset
      })
    );
    setPokemonList(allPokemons.slice(offset, offset + size));
  };

  return (
    <Footer>
      <Space>
        <Pagination
          current={currentPage.currentPage}
          total={allPokemons.length}
          pageSizeOptions={[10, 20, 50]}
          pageSize={currentPage.limit}
          onChange={handlePageChange}
        />
      </Space>
    </Footer>
  );
}
