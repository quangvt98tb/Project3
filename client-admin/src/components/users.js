import React from 'react';
import {Filter, ReferenceInput, SelectInput, List, Datagrid,
        SimpleShowLayout, Show, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, BooleanInput,
        TextInput, DateInput } from 'react-admin';
// export PostIcon from '@material-ui/core/svg-icons/action/book';
// import {DateInput} from 'react-admin-date-inputs';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="fullName" alwaysOn />
    </Filter>
);
export const UserList = (props) => (
    <List title="Quản lý người dùng" filters={<PostFilter />} {...props}>
        <Datagrid>
            <TextField label="Họ và tên" source="fullName" />
            <TextField label="Địa chỉ" source="address.province"  />
            <TextField label="Số điện thoại" source="phone" />
            {/* <DateField label="Ngày sinh" source="dateOfBirth" /> */}
            <TextField label='Giới tính' source="gender" />
            <TextField label="Email" source="email" type="email" />
            <TextField label="Đang hoạt động" source="enable" />
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const CustomerEdit = (props) => (
    <Show  title="Xem thông tin tài khoản" {...props}>
        <SimpleForm>
            <DisabledInput  label="Họ và tên" source="fullName" />
            <DisabledInput  label="Địa chỉ" source="address.province" />
            <DisabledInput  label="Số điện thoại" source="phone" />
            <DisabledInput  label="Ngày sinh" source="dateOfBirth" />
            <DisabledInput  label='Giới tính' source="gender" />
            <DisabledInput  label="Email" source="email" />
            <BooleanInput label="Đang hoạt động" source="enable" />
        </SimpleForm>
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
