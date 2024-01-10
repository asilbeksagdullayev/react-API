import { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import { IEntity } from './types';
import * as Mappers from './mappers';
import Spinner from './spinner';

interface UsersState {
  users: IEntity.User[];
  isLoading: boolean;
}

export default class Users extends Component<any, UsersState> {
  state: UsersState = {
    users: [],
    isLoading: false
  };

  onLoadUsers = async () => {
    try {
      this.setState({ isLoading: true });
      await new Promise(res => setTimeout(() => res(20), 2000));

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: any[] = await res.json();
      const users = (data || []).map(Mappers.User);
      this.setState({ users, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, users } = this.state;
    return (
      <div className="mx-auto w-full">
        {users.length ? (
          <Table
            bordered
            rowKey="id"
            columns={[
              {
                title: 'Name 🌀',
                dataIndex: 'name'
              },
              {
                title: 'Username 🤦🏻',
                dataIndex: 'username'
              },
              {
                title: 'Email 📧',
                dataIndex: 'email'
              },
              {
                title: 'City 🌆',
                dataIndex: 'city'
              },
              {
                title: 'ZipCode 🔒',
                dataIndex: 'zipcode',
                render: zipcode => <Tag>🇺🇿 {zipcode}</Tag>
              },
              {
                title: 'Website ⛬',
                dataIndex: 'website'
              },
              {
                title: 'Company 💼',
                dataIndex: 'company'
              }
            ]}
            dataSource={users}
            pagination={false}
            rowClassName="text-center"
          />
        ) : (
          <div className="flex justify-center">
            
          </div>
        )}

        <Spinner visible={isLoading} />
      </div>
    );
  }
}
