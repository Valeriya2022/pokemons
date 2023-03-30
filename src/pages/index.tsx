import { useGetPokemonsQuery } from '@/redux/features/pokemonsSlice';
import { Spin, Layout, Pagination, Space } from 'antd';
import { Pokemons } from '@/components/pokemons';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCurrentPage, setCurrentPage } from '@/redux/slices/pageSlice';

const { Footer } = Layout;

export default function Home() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const { isLoading, data, refetch, isFetching } = useGetPokemonsQuery({
    offset: currentPage.offset,
    limit: currentPage.limit
  });

  const handlePageChange = (page, size) => {
    dispatch(
      setCurrentPage({
        currentPage: page,
        limit: size,
        offset: (page - 1) * size
      })
    );
    refetch();
  };

  if (isLoading || !data || isFetching) {
    return (
      <div className={'container-center'}>
        <Spin size="large" />{' '}
      </div>
    );
  }

  return (
    <Layout>
      <Pokemons data={data.results} />
      <Footer>
        <Space>
          <Pagination
            current={currentPage.currentPage}
            total={data.count}
            pageSizeOptions={[10, 20, 50]}
            pageSize={currentPage.limit}
            onChange={handlePageChange}
          />
        </Space>
      </Footer>
    </Layout>
  );
}
