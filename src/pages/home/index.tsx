import { DashboardTotalCountCard, ServiceAdvisorActivities } from "@/components";
import TasksChart from "@/components/home/tasks-chart";
import UpcomingEvents from "@/components/home/upcoming-events";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { DashboardTotalCountsQuery } from "@/graphql/types";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";
import gql from "graphql-tag";
import React from "react";

export const Home = () => {
  const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
    url: '',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY
    }
  })

  return (
    <div>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard resource="companies" isLoading={isLoading} totalCount={data?.data.companies.totalCount}/>
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard resource="contacts" isLoading={isLoading} totalCount={data?.data.contacts.totalCount}/> {/* Total Repairs */}
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard resource="deals" isLoading={isLoading} totalCount={data?.data.deals.totalCount}/> {/* Total Calls */}
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={16}></Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpcomingEvents />
        </Col>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <TasksChart />
        </Col>
      </Row>

    <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
      <Col xs={24}>
        <ServiceAdvisorActivities />
      </Col>
    </Row>

    </div>
  );
};
