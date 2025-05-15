using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Models
{
    public class DashBoard
    {
        public int TotalStudents { get; set; }
        public int TotalBook { get; set; }
        public int TotalTransaction { get; set; }
        public int TotalBooksBorrowed { get; set; }
        public int TotalBooksReturned { get; set; }
        public List<OverdueBorrower> OverdueBorrowers { get; set; }
    }
    public class OverdueBorrower
    {
        public string Name { get; set; }
        public string BorrowedId { get; set; }
    }
}
