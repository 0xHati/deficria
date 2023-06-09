import { useParams } from 'react-router-dom';
import defillama from 'defillama-api';
import { useQuery } from 'react-query';
import { fetchData, unixToMs } from '../../utils/helpers';
import LineChart from '../../components/Chart/LineChart';
import CategoryChart from '../../components/Chart/CategoryChart';
import ChartContainer from '../../components/Chart/ChartContainer';
import { useMemo } from 'react';
import StackedLineChart from '../../components/Chart/StackedLineChart';
import TVLDetailStats from './TVLDetailStats';
import styles from './TotalValueLockedDetail.module.scss';

const TotalValueLockedDetail = () => {
  const { protocol } = useParams();
  const { data: dataProtocol } = useQuery(['fees', protocol], () => fetchData(defillama.tvl.protocol(protocol)));

  const distributionChartData = useMemo(() => {
    const transformedData = {};
    Object.entries(dataProtocol.chainTvls).forEach(([chain, { tvl }]) => {
      tvl.forEach(({ date, totalLiquidityUSD }) => {
        if (!transformedData[chain]) {
          transformedData[chain] = [[unixToMs(date), totalLiquidityUSD]];
        } else {
          transformedData[chain].push([unixToMs(date), totalLiquidityUSD]);
        }
      });
    });
    return transformedData;
  }, [dataProtocol]);

  const tvlHistory = useMemo(() => {
    return dataProtocol.tvl.map(({ date, totalLiquidityUSD }) => {
      return {
        x: unixToMs(date),
        y: totalLiquidityUSD,
      };
    });
  });

  return (
    <>
      <TVLDetailStats data={dataProtocol} />
      <ChartContainer>
        {/* only show if there are more chains */}
        {Object.keys(distributionChartData).length > 1 && (
          <StackedLineChart
            data={distributionChartData}
            title={'TVL per Chain'}
            className={styles['chart--full-width']}
          />
        )}
        <LineChart
          data={tvlHistory}
          title={'TVL over time'}
          annotationsData={dataProtocol?.hallmarks}
        />
        <CategoryChart
          data={dataProtocol.currentChainTvls}
          threshold={0.5}
        />
      </ChartContainer>
    </>
  );
};

export default TotalValueLockedDetail;
