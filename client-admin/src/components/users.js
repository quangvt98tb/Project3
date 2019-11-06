import React from 'react';
import {Filter, ReferenceInput, SelectInput, List, Datagrid,
        SimpleShowLayout, Show, Create, SimpleForm, DateField, 
        TextField, EditButton, DisabledInput, BooleanInput,
        TextInput, DateInput } from 'react-admin';
// export PostIcon from '@material-ui/core/svg-icons/action/book';
// import {DateInput} from 'react-admin-date-inputs';

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
        <SimpleForm>
            <DisabledInput  label="Full Name" source="fullName" />
            <DisabledInput  label="Address" source="address.province" />
            <DisabledInput  label="Phone" source="phone" />
            <DisabledInput  label="Birthday" source="dateOfBirth" />
            <DisabledInput  label='Gender' source="gender" />
            <DisabledInput  label="Email" source="email" />
            <BooleanInput label="Block-Activity" source="enable" />
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
