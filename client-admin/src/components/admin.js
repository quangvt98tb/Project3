import React from 'react';
import {Filter, ReferenceInput, SelectInput, List, Datagrid,
        SimpleShowLayout, Show, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, BooleanInput,
        TextInput, DateInput, email, required } from 'react-admin';
// export PostIcon from '@material-ui/core/svg-icons/action/book';
// import {DateInput} from 'react-admin-date-inputs';
const validateEmail= [email('Nhập đúng dạng email'), required('Không thể bỏ trống!')];

const AdminFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="email" alwaysOn />
    </Filter>
);
export const AdminList = (props) => (
    <List title="Danh sách quản trị viên" filters={<AdminFilter />} {...props}>
        <Datagrid>
            <TextField label="Email" source="email" type="email" />
            <EditButton/>
        </Datagrid>
    </List>
);

// const PostTitle = ({ record }) => {
//     return <span>Post {record ? `"${record.title}"` : ''}</span>;
// };

export const AdminEdit = (props) => (
    <Show  title="Xem thông tin tài khoản" {...props}>
        <SimpleForm>
            <DisabledInput  label="Email" source="email" />
            <BooleanInput label="Trạng thái" source="enable" />
        </SimpleForm>
    </Show>
);

export const AdminCreate = (props) => (
    <Create title="Thêm quản trị viên mới" {...props}>
        <SimpleForm>
            <TextInput source="Email" type="email" validate={validateEmail}/>
            <TextInput label="Mật khẩu" source="password" />
        </SimpleForm>
    </Create>
);
