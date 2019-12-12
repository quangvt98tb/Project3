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

const PublisherFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="name" alwaysOn />
    </Filter>
);

export const PublisherList = (props) => (
    <List title="Quản lý nhà xuất bản " {...props} filters={<PublisherFilter/>} >
        <Datagrid>
            <TextField label="Nhà xuất bản" source="name" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const PublisherEdit = (props) => (
    <Edit title="Chỉnh sửa chi tiết" {...props}>
        <SimpleForm>
            <TextInput label="Nhà xuất bản" source="name" validate={validateName} />
            <TextInput label="Miêu tả" source="description" />
        </SimpleForm>
    </Edit>
);

export const PublisherCreate = (props) => (
    <Create title="Thêm nhà xuất bản mới" {...props}>
        <SimpleForm>
            <TextInput label="Nhà xuất bản" source="name" validate={validateName} />
            <TextInput label="Miêu tả" source="description" />
        </SimpleForm>
    </Create>
);