import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Student() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        async function getAllStudents() {
            try {
                const students = await axios.get("http://127.0.0.1:8000/api/get-students")
                setStudents(students.data)
            } catch (error) {

            }
        }

        getAllStudents();
    }, [])
    return (
        <>
            <h1>Students Info</h1>
            {
                students.map((student, i) => {
                    return (
                        <h3 key={i}> Name : {student.first_name} {student.last_name}</h3>
                    );
                })
            }
        </>
    );
}