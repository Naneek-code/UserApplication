using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserAplication.Modals
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }



}
