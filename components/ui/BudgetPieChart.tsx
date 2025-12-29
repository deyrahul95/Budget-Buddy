import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Text as SvgText } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";

type BudgetPieChartProps = {
  income: number;
  expense: number;
};

export default function BudgetPieChart({
  income,
  expense,
}: BudgetPieChartProps) {
  const saving = income - expense;

  const expensePercent = (expense / income) * 100;
  const savingPercent = saving < 0 ? 0 : (saving / income) * 100;

  const backgroundColor = expensePercent <= 60 ? "#E8F5E9" : "#FDECEA";

  const data = [
    {
      key: 1,
      value: expense,
      svg: { fill: "#E53935" },
      label: `${expensePercent.toFixed(0)}%`,
    },
    {
      key: 2,
      value: saving,
      svg: { fill: "#43A047" },
      label: `${savingPercent.toFixed(0)}%`,
    },
  ];

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const chartSize = isTablet ? width * 0.40 : width * 0.25;
  const outerRadius = chartSize / 2;
  const innerRadius = outerRadius * 0.1;
  const labelRadius = outerRadius * 0.5;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <PieChart
        style={{
          height: chartSize,
          width: chartSize,
          alignSelf: "center",
        }}
        data={data}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        labelRadius={labelRadius}
      >
        <Labels isTablet={isTablet} />
      </PieChart>

      {isTablet && (
        <Legends
          expensePercent={expensePercent}
          savingPercent={savingPercent}
        />
      )}
    </View>
  );
}

const Legends = ({
  expensePercent,
  savingPercent,
}: {
  expensePercent: number;
  savingPercent: number;
}) => {
  return (
    <View style={styles.legend}>
      <Text style={{ color: "#E53935" }}>
        ● Expense: {expensePercent.toFixed(1)}%
      </Text>
      <Text style={{ color: "#43A047" }}>
        ● Saving: {savingPercent.toFixed(1)}%
      </Text>
    </View>
  );
};

const Labels = ({ slices, isTablet }: any) => {
  return slices.map((slice: any, index: any) => {
    const { pieCentroid, data } = slice;
    return (
      <SvgText
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill="white"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={isTablet ? 16 : 14}
        fontWeight="bold"
      >
        {data.label}
      </SvgText>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 8,
  },
  legend: {
    marginVertical: 5,
    alignItems: "center",
  },
});
