const factories = [
	{ name: 'BR1', employees: ['John', 'Alice', 'Bob', 'Jessie', 'Karen'] },
	{ name: 'BR2', employees: ['Jessie', 'Karen', 'John'] },
	{ name: 'BR3', employees: ['Miles', 'Eric', 'Henry', 'Bob'] },
	{ name: 'BR4', employees: [] },
]

//   1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
//   2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
//   3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }

function getEmployeeAmountByFactory(factories) {
	return factories.map(factory => {
		return {
			name: factory.name,
			count: factory.employees.length,
		}
	})
}

function getFactoryAmountByEmployee(factories) {
	const grouped = factories.reduce((acc, cur) => {
		cur.employees.forEach(employee => {
			acc[employee] = acc[employee] ?? []
			acc[employee].push(cur.name)
		})
		return acc
	}, {})

	return Object.entries(grouped).map(e => {
		return {
			employee: e[0],
			count: e[1].length,
		}
	})
}

function sortFactories(factories) {
	return factories.map(factory => {
		return {
			name: factory.name,
			employees: factory.employees.slice().sort(),
		}
	})
}

const section1 = () => {
	console.log('1. ', getEmployeeAmountByFactory(factories))
	console.log('2. ', getFactoryAmountByEmployee(factories))
	console.log('3. ', sortFactories(factories))
}
section1()

const employeeType = [
	{ id: 1, name: 'FullTime', work_begin: '09:00:00', work_end: '17:00:00' },
	{ id: 2, name: 'MidTime', work_begin: '12:00:00', work_end: '21:00:00' },
	{ id: 3, name: 'HalfTime', work_begin: '20:00:00', work_end: '00:00:00' },
]

const employees = [
	{ id: 1, name: 'Alice', type: 2 },
	{ id: 2, name: 'Bob', type: 3 },
	{ id: 3, name: 'John', type: 2 },
	{ id: 4, name: 'Karen', type: 1 },
	{ id: 5, name: 'Miles', type: 3 },
	{ id: 6, name: 'Henry', type: 1 },
]

const tasks = [
	{ id: 1, title: 'task01', duration: 60 }, // min
	{ id: 2, title: 'task02', duration: 120 },
	{ id: 3, title: 'task03', duration: 180 },
	{ id: 4, title: 'task04', duration: 360 },
	{ id: 5, title: 'task05', duration: 30 },
	{ id: 6, title: 'task06', duration: 220 },
	{ id: 7, title: 'task07', duration: 640 },
	{ id: 8, title: 'task08', duration: 250 },
	{ id: 9, title: 'task09', duration: 119 },
	{ id: 10, title: 'task10', duration: 560 },
	{ id: 11, title: 'task11', duration: 340 },
	{ id: 12, title: 'task12', duration: 45 },
	{ id: 13, title: 'task13', duration: 86 },
	{ id: 14, title: 'task14', duration: 480 },
	{ id: 15, title: 'task15', duration: 900 },
]

// 4. Count total hours worked in 1 day ? // => 39
// 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.

const { DateTime, Interval } = require('luxon')

function formatWorkTime(time) {
	return time === '00:00:00' ? '24:00:00' : time
}

function leftJoin(table1, table2, key1, key2) {
	return table1.map(t1 => ({
		...t1,
		...table2.find(t2 => t1[key1] === t2[key2]),
	}))
}

function getTotalHours(employeeType, employees) {
	const joined = leftJoin(employees, employeeType, 'type', 'id')

	return joined.reduce((acc, cur) => {
		const start = DateTime.fromISO(cur.work_begin)
		const end = DateTime.fromISO(formatWorkTime(cur.work_end))

		const diff = end.diff(start, 'hours').hours
		acc += diff
		return acc
	}, 0)
}

function howManyEmployeeByTime(time) {
	const dayTime = DateTime.fromISO(time)
	const joined = leftJoin(employees, employeeType, 'type', 'id')

	return joined.reduce((acc, cur) => {
		const start = DateTime.fromISO(cur.work_begin)
		const end = DateTime.fromISO(formatWorkTime(cur.work_end))
		if (dayTime > start && dayTime < end) {
			acc++
		}
		return acc
	}, 0)
}

function howManyDaysNeeded(tasks) {
	const totalTaskDuration = tasks.reduce((acc, cur) => {
		return acc + cur.duration
	}, 0)
	const totalHours = totalTaskDuration / 60
	const workTimeEachDay = DateTime.fromISO('24:00:00').diff(DateTime.fromISO('09:00:00'), 'hours').hours
	return totalHours / workTimeEachDay
}

const section2 = () => {
	console.log('4. ', getTotalHours(employeeType, employees))
	console.log('5. ', howManyEmployeeByTime('21:00:00'))
	console.log('6. ', howManyDaysNeeded(tasks))
}
section2()
