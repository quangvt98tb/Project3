import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, 
    TextField, EditButton, DisabledInput, LongTextInput,
    TextInput, required, Filter, Show, SimpleShowLayout} from 'react-admin';


const validateName = [required('Không được bỏ trống')];

const AuthorFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tìm kiếm" source="name" alwaysOn/>
    </Filter>
);

export const AuthorList = (props) => (
    <List title="Quản lý tác giả" {...props} filters={<AuthorFilter/>} >
        <Datagrid>
            <TextField label="Tác giả" source="name"  />
            {/* <TextField label="Miêu tả" source="description" /> */}
            <EditButton/>
        </Datagrid>
    </List>
);

export const AuthorEdit = (props) => (
    <Edit title="Chỉnh sửa chi tiết" {...props}>
        <SimpleForm>
            <TextInput label="Tác giả" source="name" validate={validateName} />
            <LongTextInput label="Miêu tả" source="description" />
        </SimpleForm>
    </Edit>
);

export const AuthorCreate = (props) => (
    <Create title="Thêm tác giả mới" {...props}>
        <SimpleForm>
            <TextInput label="Tác giả" source="name" validate={validateName} />
            <LongTextInput label="Miêu tả" source="description" />
        </SimpleForm>
    </Create>
);