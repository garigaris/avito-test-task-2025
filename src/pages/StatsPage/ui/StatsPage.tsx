import { useEffect, useState } from "react";
import { statsApi } from "../../../shared/api/statsApi";
import {
  StatsSummaryDTO,
  ActivityDataDTO,
  DecisionsDataDTO,
  StatsPeriod
} from "../../../shared/types/apiTypes";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

import styles from './StatsPage.module.css';

const COLORS = ["#4caf50", "#f44336", "#ff9800"]; 

export const StatsPage = () => {
  const [summary, setSummary] = useState<StatsSummaryDTO | null>(null);
  const [activityData, setActivityData] = useState<ActivityDataDTO[]>([]);
  const [decisionsData, setDecisionsData] = useState<DecisionsDataDTO | null>(null);
  const [categoriesData, setCategoriesData] = useState<Record<string, number> | null>(null);
  const [period, setPeriod] = useState<StatsPeriod>("week"); // today/week/month

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      const [summaryRes, activityRes, decisionsRes, categoriesRes] = await Promise.all([
        statsApi.getStatsSummary({ period }),
        statsApi.getActivityChart({ period }),
        statsApi.getDecisionsChart({ period }),
        statsApi.getCategoriesChart({ period }),
       
      ]);

      setSummary(summaryRes);
      setActivityData(activityRes);
      setDecisionsData(decisionsRes);
      setCategoriesData(categoriesRes as Record<string, number>);
      console.log(summaryRes)
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  
  const normalizedActivityData = activityData.map(item => ({
    date: item.date ? new Date(item.date).toLocaleDateString("ru-RU") : "",
    approved: item.approved || 0,
    rejected: item.rejected || 0,
    requestChanges: item.requestChanges || 0
  }));

  const normalizedCategoriesData = categoriesData
    ? Object.entries(categoriesData).map(([name, count]) => ({
        name,
        count
      }))
    : [];

  return (
    <div className={styles.container}>
      <h1>Статистика модератора</h1>

      <div className={styles.periodSelector}>
        <button onClick={() => setPeriod("today")} className={styles.active}>Сегодня</button>
        <button onClick={() => setPeriod("week")} className={styles.active}>Неделя</button>
        <button onClick={() => setPeriod("month")} className={styles.active}>Месяц</button>
      </div>

      {summary && (
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Проверено объявлений</h3>
            <p>{summary.totalReviewed}</p>
          </div>
          <div className={styles.card}>
            <h3>Одобрено</h3>
            <p>{Math.floor(summary.approvedPercentage)}%</p>
          </div>
          <div className={styles.card}>
            <h3>Отклонено</h3>
            <p>{Math.floor(summary.rejectedPercentage)}%</p>
          </div>
          <div className={styles.card}>
            <h3>Среднее время проверки</h3>
            <p>{Math.floor(summary.averageReviewTime / 1000 / 60)} мин</p>
          </div>
        </div>
      )}

      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <h3>Активность за период</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={normalizedActivityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" stackId="a" fill="#4caf50" name="Одобрено" />
              <Bar dataKey="rejected" stackId="a" fill="#f44336" name="Отклонено" />
              <Bar dataKey="requestChanges" stackId="a" fill="#ff9800" name="На доработку" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {decisionsData && (
          <div className={styles.chartContainer}>
            <h3>Распределение решений</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Одобрено", value: decisionsData.approved },
                    { name: "Отклонено", value: decisionsData.rejected },
                    { name: "На доработку", value: decisionsData.requestChanges }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {normalizedCategoriesData.length > 0 && (
          <div className={styles.chartContainer}>
            <h3>Проверено по категориям</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={normalizedCategoriesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
