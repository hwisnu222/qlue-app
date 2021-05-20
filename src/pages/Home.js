import React, { useEffect, useState } from "react";
import { Row, Col, Table, Pagination } from "react-bootstrap";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts";
import { API_BASE } from "../config/api";

// components
import Header from "../components/Header";

export default function Home() {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(1);

  const fetchData = async (number = 1) => {
    const result = await API_BASE.get(`/people/?page=${number}`);
    setData(result.data);
  };

  const dataLenght = data?.count;
  let items = [];
  for (let number = 1; number <= Math.ceil(dataLenght / 10); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pagination}
        onClick={() => {
          setPagination(number);
          fetchData(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const local = localStorage.getItem("data");
    if (!local) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="container-pg">
        <h4 className="mb-3">Overview</h4>
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart
            data={data?.results}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              allowDecimals={true}
              domain={["dataMin", "dataMax"]}
            />
            <YAxis
              type="category"
              dataKey="height"
              domain={["dataMin", "dataMax"]}
              allowDecimals={true}
              label={{
                value: "Height",
                position: "insideLeft",
                angle: -90,
                dy: -10,
              }}
              yAxisId={1}
            />
            <YAxis
              type="category"
              dataKey="mass"
              allowDecimals={true}
              domain={["dataMin", "dataMax"]}
              color="#FFDA5F"
              label={{
                value: "Mass",
                position: "insideLeft",
                angle: -90,
                dy: -10,
                dx: 10,
              }}
              yAxisId={0}
            />

            <Tooltip />
            <CartesianGrid stroke="#EBEBF5" />
            <Line type="monotone" dataKey="mass" stroke="#FFDA5F" yAxisId={0} />
            <Line
              type="monotone"
              dataKey="height"
              stroke="#2196F3"
              yAxisId={1}
            />
          </LineChart>
        </ResponsiveContainer>
        <Row>
          <Col md={9}>
            <h4 className="mt-5">Recent Face</h4>
            <Table hover className="w-100">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Hair</th>
                  <th>Skin</th>
                </tr>
              </thead>
              <tbody>
                {data?.results.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.height}</td>
                    <td>{item.hair_color}</td>
                    <td>{item.skin_color}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <Pagination className="ml-auto">{items}</Pagination>
            </div>
          </Col>
          <Col md={3} className="pt-4">
            <div className="card-menu mt-5">
              <i class="fa fa-child" aria-hidden="true">
                hello
              </i>
              <div>
                <span className="people-count m-auto">{data?.count}</span>
                <span className="text-muted ml-2">People</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
