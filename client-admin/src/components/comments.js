import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
    TextField, EditButton, DisabledInput,ReferenceField, BooleanInput,
    TextInput, Filter } from 'react-admin';

export const CommentList = (props) => (
    <List title="Quản lý Bình Luận" {...props} >
        <Datagrid>
            <ReferenceField  label="Sách" reference="Books" source="bookId">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label="Thành viên" reference="customer" source="userId">
                <TextField source="fullName" />
            </ReferenceField>
            <TextField label="Nội dung" source="content" />
            <TextField label="Đã được duyệt" source="enable" />
            <TextField label="Được hiển thị" source="display" />
            <EditButton name="Duyệt"/>
        </Datagrid>
    </List>
);

export const CommentEdit = (props) => (
    <Edit title="Duyệt Bình luận" {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <ReferenceField  label="Sách" reference="Books" source="bookId">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label="Thành viên" reference="customer" source="userId">
                <TextField source="fullName" />
            </ReferenceField>
            <DisabledInput label="Ngày bình luận" source="createdAt" /> 
            <DisabledInput label="Nội dung" source="content" /> 
            <BooleanInput label="Đã được duyệt" source="enable" />
            <BooleanInput label="Được hiển thị" source="display" />
        </SimpleForm>
    </Edit>
);
