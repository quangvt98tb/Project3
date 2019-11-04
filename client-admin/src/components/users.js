import React from 'react';
import {Filter, ReferenceInput, SelectInput, List, Datagrid,
        SimpleShowLayout, Show, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, 
        TextInput, DateInput } from 'react-admin';
// export PostIcon from '@material-ui/core/svg-icons/action/book';
// import {DateInput} from 'react-admin-date-inputs';
const choices = [
    { _id: 1, gender: 'Nam' },
    { _id: 2, gender: 'Nữ' },
    { _id: 3, gender: 'Giới tính thứ 3'}
];
const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="fullName" alwaysOn />
        <TextInput label="Họ và tên" source="fullName" allowEmpty>
            <SelectInput optionText="fullName" />
        </TextInput>
    </Filter>
);
export const UserList = (props) => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid>
            <TextField label="Full Name" source="fullName" />
            <TextField label="Address" source="address.province"  />
            <TextField label="Phone" source="phone" />
            <DateField label="Birthday" source="dateOfBirth" />
            <TextField label='Gender' source="gender" />
            <TextField label="Email" source="email" type="email" />
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const CustomerEdit = (props) => (
    <Show  title="Xem thông tin tài khoản" {...props}>
        <SimpleShowLayout>
            <TextField  label="Full Name" source="fullName" />
            <TextField  label="Address" source="address.province" />
            <TextField  label="Phone" source="phone" />
            <DateField  label="Birthday" source="dateOfBirth" />
            <TextField  label='Gender' source="gender" />
            <TextField  label="Email" source="email" type="email" />
        </SimpleShowLayout>
    </Show>
);

// export const UserCreate = (props) => (
//     <Create title="Tạo một tài khoản mới" {...props}>
//         <SimpleForm>
//         <TextInput source="fullName" />
//             <TextInput source="address" />
//             <TextInput source="phone" />
//             <DateInput source="dateOfBirth" />
//             <SelectInput source="gender" choices={choices} optionText="gender" optionValue="_id"/>
//             <TextInput source="createAt" />
//             <TextInput source="username" />
//             <TextInput source="email" />
        
//         </SimpleForm>
//     </Create>
// );
