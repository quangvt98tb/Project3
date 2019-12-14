import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, 
        EditButton, TextInput, ReferenceField , ReferenceInput, minValue,
        LongTextInput, DateInput, SelectInput, NumberInput , ArrayField,DisabledInput,
        required, number, BooleanInput, Filter, UrlField} from 'react-admin';

const validateUid = [required('Không được bỏ trống!')]; 
const validateName = [required('Không được bỏ trống!')];
const validateQuantity = [ number(),minValue(0)];

const BookFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Tên sách" source="name" alwaysOn/>
        <TextInput label="Tác giả" source="author" alwaysOn />
    </Filter>
);

export const BookList = (props) => (
    <List title="Quản lý sách" {...props} filters={<BookFilter />} >
        <Datagrid>
            <TextField label="UID sách" source="uid" />
            <TextField label="Tên sách" source="name" />
            <ReferenceField  label="Tác giả" reference="Authors" source="authorId">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label="Thể loại" reference="Categories" source="categoryId">
                <TextField source="name" />
            </ReferenceField>
             <ReferenceField  label="Nhà xuất bản" reference="Publishers" source="publisherId">
                <TextField source="name" />
            </ReferenceField>
            <UrlField  label="Ảnh" source="imgURL" />
            <TextField label="Số lượng" source="quantity" />
            <TextField label="Giá" source="sellPrice" />
            <TextField label="Đang kinh doanh" source="enable" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const BookEdit = (props) => (
    <Edit title="Thông tin chi tiết" {...props}>
        <SimpleForm>
            <DisabledInput label="UID sách" source="uid" />
            <TextInput label="Tên sách" source="name" validate={validateName} />
            <ReferenceInput   label="Thể loại" reference="Categories" source="categoryId">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <LongTextInput label="Giới thiệt" source="description" />
            <TextInput label="Ảnh" source="imgURL" />
            <ReferenceInput   label="Nhà xuất bản" reference="Publishers" source="publisherId">
                <SelectInput optionText="name" />
            </ReferenceInput> 
             <ReferenceInput   label="Tác giả" reference="Authors" source="authorId">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput label="Số lượng"  source="quantity" validate={validateQuantity} />
            <NumberInput  label="Giá" source="sellPrice"  validate={validateQuantity} />
            <DateInput label="Ngày xuất bản" source="publishedAt" />
            <BooleanInput label="Đang kinh doanh" source="enable" />
        </SimpleForm>
    </Edit>
);
export const BookCreate = (props) => (
    <Create title="Thêm sách mới" {...props}>
        <SimpleForm>
            <TextInput label="UID sách" source="uid" validate={validateUid} />
            <TextInput label="Tên sách" source="name" validate={validateName} />
            <ReferenceInput   label="Thể loại" reference="Categories" source="categoryId">
                <SelectInput optionText="name" />
            </ReferenceInput> 
            <TextInput label="Miêu tả" source="description" />
            <TextInput label="Ảnh" source="imgURL" />
            <ReferenceInput   label="Nhà xuất bản" reference="Publishers" source="publisherId">
                <SelectInput optionText="name" />
            </ReferenceInput> 
             <ReferenceInput   label="Tác giả" reference="Authors" source="authorId">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput label="Số lượng"  source="quantity" validate={validateQuantity} />
            <NumberInput  label="Giá" source="sellPrice" validate={validateQuantity} />
            <DateInput label="Ngày xuất bản" source="publishedAt" />
            <BooleanInput label="Đang kinh doanh" source="enable" />
        </SimpleForm>
    </Create>
);
