import React from 'react';
import {Filter, List, Datagrid,
        SimpleShowLayout, Show, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, BooleanInput,
        TextInput, } from 'react-admin';
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
            <TextField label='Giới tính' source="gender" />
            <TextField label="Email" source="email" type="email" />
            {/* <TextField label="Mở khóa bình luận" source="enable"/> */}
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

// export const CustomerEdit = (props) => (
//     <Show  title="Xem thông tin tài khoản" {...props}>
//         <SimpleForm>
//             <DisabledInput  label="Họ và tên" source="fullName" />
//             <DisabledInput  label="Địa chỉ" source="address.province" />
//             <DisabledInput  label="Số điện thoại" source="phone" />
//             <DisabledInput  label='Giới tính' source="gender" />
//             <DisabledInput  label="Email" source="email" />
//             <DisabledInput  label="Ngày tạo tài khoản" source="createdAt" />
//             <BooleanInput  label="Mở khóa bình luận" source="enable" />
//         </SimpleForm>
//     </Show>
// );


