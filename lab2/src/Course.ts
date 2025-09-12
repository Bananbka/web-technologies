interface Course {
    name: string;
    durationHours: number;
    students: string[];
}


class OnlineCourse implements Course {
    public name: string;
    public durationHours: number;
    public students: string[];

    constructor(name: string, durationHours: number) {
        this.name = name;
        this.durationHours = durationHours;
        this.students = [];
    }


    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`${student} has been successfully registered to "${this.name}"`);
        } else {
            console.log(`${student} already registered to "${this.name}"`);
        }
    }


    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}


class CourseManager {
    private courses: Course[];

    constructor() {
        this.courses = [];
    }

    addCourse(course: Course): void {
        if (!this.findCourse(course.name)) {
            this.courses.push(course);
            console.log(`Course "${course.name}" was added`);
        } else {
            console.log(`Course "${course.name}" already added`);
        }
    }

    removeCourse(courseName: string): void {
        const index = this.courses.findIndex(c => c.name === courseName);
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log(`Course "${courseName}" has been deleted`);
        } else {
            console.log(`Course "${courseName}" wasn't found`);
        }
    }

    findCourse(courseName: string): Course | undefined {
        return this.courses.find(c => c.name === courseName);
    }


    listCourses(): void {
        for (const course of this.courses) {
            console.log(`Course: ${course.name} (${course.durationHours} hrs)`);
            if (course.students.length > 0) {
                console.log(`Students: ${course.students.join(", ")}`);
            } else {
                console.log("Students: —");
            }
            console.log("------");
        }
    }
}


const course1 = new OnlineCourse("History of Labubu development", 20);
const course2 = new OnlineCourse("Labubu Maintaining: Progressive course", 30);
const course3 = new OnlineCourse("Capitalism as the opium", 10);


const manager = new CourseManager();
manager.addCourse(course1);
manager.addCourse(course2);
manager.addCourse(course3);


course1.registerStudent("Alice");
course1.registerStudent("Bob");
course2.registerStudent("Charlie");
course3.registerStudent("Alice");
course3.registerStudent("David");
course3.registerStudent("Bob");
course3.registerStudent("Bob");


manager.listCourses();


console.log("AFTER DELETE")
manager.removeCourse("Capitalism as the opium");
manager.listCourses();
