using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace WebApi_ConEntity.Models
{
    public partial class tareacovidContext : DbContext
    {
        public tareacovidContext()
        {
        }

        public tareacovidContext(DbContextOptions<tareacovidContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Paciente> Pacientes { get; set; }
        public virtual DbSet<Provincia> Provincias { get; set; }
        public virtual DbSet<Vacuna> Vacunas { get; set; }
        public virtual DbSet<Vacunado> Vacunados { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;uid=root;pwd=mysql;database=tareacovid", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.18-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb4")
                .UseCollation("utf8mb4_general_ci");

            modelBuilder.Entity<Paciente>(entity =>
            {
                entity.ToTable("pacientes");

                entity.UseCollation("utf8mb4_0900_ai_ci");

                entity.HasIndex(e => e.Cedula, "cedula")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnType("int(20)")
                    .HasColumnName("id");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("apellido");

                entity.Property(e => e.Cedula)
                    .HasColumnType("int(20)")
                    .HasColumnName("cedula");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("date")
                    .HasColumnName("fecha_nacimiento");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("nombre");

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("telefono");
            });

            modelBuilder.Entity<Provincia>(entity =>
            {
                entity.ToTable("provincias");

                entity.UseCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Id)
                    .HasColumnType("int(20)")
                    .HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Vacuna>(entity =>
            {
                entity.ToTable("vacunas");

                entity.UseCollation("utf8mb4_0900_ai_ci");

                entity.HasIndex(e => e.ProvinciaId, "provincia_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(20)")
                    .HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("nombre");

                entity.Property(e => e.ProvinciaId)
                    .HasColumnType("int(20)")
                    .HasColumnName("provincia_id");

                entity.HasOne(d => d.Provincia)
                    .WithMany(p => p.Vacunas)
                    .HasForeignKey(d => d.ProvinciaId)
                    .HasConstraintName("vacunas_ibfk_1");
            });

            modelBuilder.Entity<Vacunado>(entity =>
            {
                entity.ToTable("vacunados");

                entity.UseCollation("utf8mb4_0900_ai_ci");

                entity.HasIndex(e => e.PacienteId, "paciente_id");

                entity.HasIndex(e => e.VacunaId, "vacuna_id");

                entity.Property(e => e.Id)
                    .HasColumnType("int(20)")
                    .HasColumnName("id");

                entity.Property(e => e.FechaVacunacion)
                    .HasColumnType("date")
                    .HasColumnName("fecha_vacunacion");

                entity.Property(e => e.PacienteId)
                    .HasColumnType("int(20)")
                    .HasColumnName("paciente_id");

                entity.Property(e => e.VacunaId)
                    .HasColumnType("int(20)")
                    .HasColumnName("vacuna_id");

                entity.HasOne(d => d.Paciente)
                    .WithMany(p => p.Vacunados)
                    .HasForeignKey(d => d.PacienteId)
                    .HasConstraintName("vacunados_ibfk_1");

                entity.HasOne(d => d.Vacuna)
                    .WithMany(p => p.Vacunados)
                    .HasForeignKey(d => d.VacunaId)
                    .HasConstraintName("vacunados_ibfk_2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
