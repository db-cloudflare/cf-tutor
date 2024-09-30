DROP TABLE IF EXISTS Companies;
CREATE TABLE IF NOT EXISTS Companies (CompanyID INTEGER PRIMARY KEY, CompanyName TEXT);
INSERT INTO Companies (CompanyID, CompanyName) VALUES (1, 'Soda Co.'), (2, 'TV Media'), (3,'Software Co.');

DROP TABLE IF EXISTS Employees;
CREATE TABLE IF NOT EXISTS Employees (EmployeeID INTEGER PRIMARY KEY, EmployeeName TEXT, CompanyID INTEGER, FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID));
INSERT INTO Employees (EmployeeID, EmployeeName, CompanyID) VALUES (1, 'Olivia Johnson', 2), (2, 'Noah Jones', 3), (3, 'James Smith', 1), (4, 'Sophia Martinez', 2);
