using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EDUMAWEBAPI.Models
{
    [Table("Course")]
    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseId { get; set; }
        public string ImageUrl { get; set; }
        public string ProfilePicUrl { get; set; }
        public string InstructorName { get; set; }
        public string CourseName { get; set; }
        public int StudentCount { get; set; }
        public int CommentsCount { get; set; }
        public decimal DiscountedPrice { get; set; }
        public decimal ActualPrice { get; set; }
        public string Categories { get; set; }
        public int ReviewCount { get; set; }
        public int LecturesCount { get; set; }
        public int Quizzes { get; set; }
        public int DurationInHours { get; set; }
        public string SkillLevel { get; set; }
        public string Language { get; set; }
        public bool Certificate { get; set; }
        public bool Assessments { get; set; }


    }
}
