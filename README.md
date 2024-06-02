
# Assign Students to mentors and vice versa

The project is an API for managing mentors and students within an educational or training environment. The API facilitates creating, retrieving, and assigning mentors and students. It provides endpoints to create new mentors and students, retrieve all or specific mentors and students, and assign students to mentor and vice versa

#### Key Features:

1. Create mentor: Creation of mentors with specific details
2. Assign students to mentor: Assigning one or more students to mentor who didn't have a mentor.
3. Retrieve mentors: Retrieving all the mentors with students details.
4. Create student: Creation of students with specific details
5. Assign mentor to students: Assigning or Changing the mentor for student.
6. Retrieve students: Retrieving all the students with mentor details.


## API Reference

#### BASE_URL = https://assign-mentor-ldwh.onrender.com

#### Create mentor

````http
  POST /api/v1/mentors/create-mentor
````

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required** |
| `last_name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `phone_number` | `string` | **Required** |
| `mentor_at` | `string` | **Required** |

#### Get all mentors

```http
  GET /api/v1/mentors/all-mentors
```
#### Get single mentor

```http
  GET /api/v1/mentors/get-mentor
```
#### Assign one or more students to mentor

```http
  PUT /api/v1/mentors/assign-students
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mentor_id` | `ObjectId` | **Required** |
| `student_id` | `[ObjectId]` | **Required** |


#### Create student

```http
  POST /api/v1/mentors/create-student
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required** |
| `last_name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `phone_number` | `string` | **Required** |
| `course` | `string` | **Required** |

#### Get all students

```http
  GET /api/v1/students/all-students
```
#### Get single student

```http
  GET /api/v1/students/get-student
```
#### Assign or change mentor to student

```http
  PUT /api/v1/mentors/assign-students
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mentor_id` | `ObjectId` | **Required** |
| `student_id` | `ObjectId` | **Required** |

## Documentation

[Postman API documentation](https://documenter.getpostman.com/view/19527033/2sA3QwbpRW)

