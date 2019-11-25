import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
    TextField, EditButton, DisabledInput, 
    TextInput, required, Filter } from 'react-admin';

const nameValidation = (value, allValues) => {

    if (!value) {
        return 'required';
    }
    return [];
}

const validateName = [required('Không được bỏ trống'), nameValidation];

const CategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="name" alwaysOn />
    </Filter>
);

export const CategoryList = (props) => (
    <List title="Quản lý thể loại" {...props} filters={<CategoryFilter/>} >
        <Datagrid>
            <TextField label="Thể loại" source="name" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const CategoryEdit = (props) => (
    <Edit title="Chỉnh sửa chi tiết" {...props}>
        <SimpleForm>
            <TextInput label="Thể loại" source="name" />
            {/* <DisabledInput source="id" /> */}
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create title="Thêm thể loại mới" {...props}>
        <SimpleForm>
            <TextInput label="Thể loại" source="name" />
        </SimpleForm>
    </Create>
);