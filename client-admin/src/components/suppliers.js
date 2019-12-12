import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
        DateField, TextField, EditButton, DisabledInput, NumberInput,
        TextInput, LongTextInput, DateInput, required, email, number, Filter } from 'react-admin';

const validateName = [required('Không thể bỏ trống!')];
const validateEmail= [email('Nhập đúng dạng email'), required('Không thể bỏ trống!')];
const validatePhone = [number("Nhập đúng số điện thoại")];

const SuppliersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="name" alwaysOn />
    </Filter>
);

export const SuppliersList = (props) => (
    <List title="Quản lý nhà cung cấp" {...props} filters={<SuppliersFilter/>} >
        <Datagrid>
            <TextField label="Nhà cung cấp" source="name" />
            <TextField source="email"/>
            <TextField label="Địa chỉ" source="address" />
            <TextField label="Số điện thoại" source="phone" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const SuppliersEdit = (props) => (
    <Edit title="Chỉnh sửa thông tin" {...props}>
        <SimpleForm>
            <TextInput label="Nhà cung cấp" source="name" validate={validateName} />
            <TextInput source="email" validate={validateEmail} />
            <TextInput label="Địa chỉ" source="address" />
            <NumberInput label="Số điện thoại" source="phone" validate={validatePhone} />
            <DisabledInput source="id" />
        </SimpleForm>
    </Edit>
);
export const SuppliersCreate = (props) => (
    <Create title="Thêm nhà cung cấp mới" {...props}>
        <SimpleForm>
            <TextInput label="Nhà cung cấp" source="name" validate={validateName} />
            <TextInput source="email" type="email" validate={validateEmail} />
            <TextInput label="Địa chỉ" source="address" />
            <TextInput label="Số điện thoại" source="phone" validate={validatePhone} />
        </SimpleForm>
    </Create>
);
