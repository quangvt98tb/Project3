import React from 'react';
import {Filter, ReferenceInput, SelectInput, List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
// export PostIcon from '@material-ui/core/svg-icons/action/book';
// import {DateInput} from 'react-admin-date-inputs';
const choices = [
    { _id: 1, gender: 'Nam' },
    { _id: 2, gender: 'Nữ' },
    { _id: 3, gender: 'Giới tính thứ 3'}
];
const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="username" alwaysOn />
        <TextInput label="Họ và tên" source="fullName" allowEmpty>
            <SelectInput optionText="fullName" />
        </TextInput>
    </Filter>
);
export const UserList = (props) => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid>
            <TextField source="fullName" />
            <TextField source="address" />
            <TextField source="phone" />
            <TextField source="dateOfBirth" />
            <TextField source="gender" />
            <TextField source="createAt" />
            <TextField source="username" />
            <TextField source="email" />
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title="Chỉnh sửa thông tin tài khoản" {...props}>
        <SimpleForm>
            <DisabledInput source="fullName" />
            <DisabledInput source="address" />
            <DisabledInput source="phone" />
            <DisabledInput source="dateOfBirth" />
            <DisabledInput source="gender" />
            <DisabledInput source="createAt" />
            <DisabledInput source="username" />
            <DisabledInput source="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create title="Tạo một tài khoản mới" {...props}>
        <SimpleForm>
        <TextInput source="fullName" />
            <TextInput source="address" />
            <TextInput source="phone" />
            <DateInput source="dateOfBirth" />
            <SelectInput source="gender" choices={choices} optionText="gender" optionValue="_id"/>
            <TextInput source="createAt" />
            <TextInput source="username" />
            <TextInput source="email" />
        
        </SimpleForm>
    </Create>
);
