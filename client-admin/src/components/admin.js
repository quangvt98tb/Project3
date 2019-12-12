import React from 'react';
import {Filter, List, Datagrid,
        SimpleShowLayout, Show, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, BooleanInput,
        TextInput, email, required } from 'react-admin';
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
            <TextField label="RootAdmin" source="enable" />
        </Datagrid>
    </List>
);

// const PostTitle = ({ record }) => {
//     return <span>Post {record ? `"${record.title}"` : ''}</span>;
// };

// export const AdminEdit = (props) => (
//     <Show  title="Xem thông tin tài khoản" {...props}>
//         <SimpleForm>
//             <DisabledInput  label="Email" source="email" />
//             <DisabledInput label="RootAdmin" source="enable" />
//         </SimpleForm>
//     </Show>
// );

export const AdminCreate = (props) => (
    <Create title="Thêm quản trị viên mới" {...props}>
        <SimpleForm>
            <TextInput label="Email" source="email" type="email" validate={validateEmail}/>
            <TextInput label="Mật khẩu" source="password" />
        </SimpleForm>
    </Create>
);
