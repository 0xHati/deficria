import { lazy } from "react";

import { Tab, TabList, TabPanel, useTabState } from "ariakit";
import Card from "../Card";
import styles from "./TablesTab.module.scss";
import FeesTable from "../Table/FeesTable";
import DexTable from "../Table/DexTable";
import TotalValueLockedTable from "../Table/TotalValueLocked";

const TablesTab = ({}) => {
  const defaultSelectedId = "default";
  const tab = useTabState({ defaultSelectedId });

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
        <FeesTable isExpanded={false} />
      </TabPanel>
      <TabPanel state={tab}>
        <TotalValueLockedTable isExpanded={false} />
      </TabPanel>
      <TabPanel state={tab}>
        <DexTable isExpanded={false} />
      </TabPanel>
    </Card>
  );
};

export default TablesTab;
