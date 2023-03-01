import { Tab, TabList, TabPanel, useTabState } from "ariakit";
import Card from "../Card";
import { TotalValueLockedTable } from "../Table/TotalValueLocked";
import { useQuery } from "react-query";
import { fetchTVL, fetchFeeData, fetchDexVolume } from "../../api/defillama";
import styles from "./TablesTab.module.scss";
import { FeesTable } from "../Table/FeesTable";
import { DexTable } from "../Table/DexTable";

const TablesTab = ({}) => {
  const defaultSelectedId = "default";
  const tab = useTabState({ defaultSelectedId });

  const { data: dataTVL } = useQuery(["TVL"], () => fetchTVL());
  const { data: dataFees } = useQuery(["fees"], () => fetchFeeData());
  const { data: dataDex } = useQuery(["dex"], () => fetchDexVolume());

  // dataTVL.forEach((item, index) => (dataFees[index].chains = data[index].chains.toString()));

  //easier to filter, get unique values, etc with strings than with arrays in react-table
  return (
    <Card>
      <TabList
        state={tab}
        aria-label="tables-stats"
        className={styles["tab-list"]}>
        <Tab
          id={defaultSelectedId}
          className={styles.tab}>
          Fees
        </Tab>
        <Tab className={styles.tab}>TVL</Tab>
        <Tab className={styles.tab}>Dex</Tab>
      </TabList>
      <TabPanel
        state={tab}
        tabId={defaultSelectedId}>
        <FeesTable
          data={dataFees.protocols}
          isExpanded={false}
        />
      </TabPanel>
      <TabPanel state={tab}>
        <TotalValueLockedTable
          data={dataTVL}
          isExpanded={false}
        />
      </TabPanel>
      <TabPanel state={tab}>
        <DexTable
          data={dataDex.protocols}
          isExpanded={false}
        />
      </TabPanel>
    </Card>
  );
};

export default TablesTab;
