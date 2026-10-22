<?php

namespace App\Models;

// importación del factory necesario
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * Departamento o área del edificio que recibe visitas.
 *
 * @property int $id
 * @property string $name Nombre del área (se almacena en minúsculas).
 * @property string $building_floor Ubicación física: edificio o piso.
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class departments extends Model
{
    // utilizamos factory
    use HasFactory;

    // tabla donde me voy a conectar
    protected $table = 'departments';
    // puedo eliminar esa linea siempre y cuando tenga el nombre de la tabla en ingles

    protected $fillable = ['name', 'building_floor'];

    /**
     * Visitas que han tenido como destino este departamento.
     *
     * @return HasMany<visits, $this>
     */
    public function visits(): HasMany
    {
        return $this->hasMany(visits::class);
    }

    // se crea una funcion para darle un atributo, se declará arriba
    /**
     * Normaliza el nombre del departamento.
     *
     * Mutador: guarda el nombre en minúsculas para evitar duplicados por mayúsculas.
     * Accesor: lo devuelve con la primera letra en mayúscula (`ucfirst`).
     *
     * @return Attribute<string, string>
     */
    protected function name():Attribute{
        return Attribute::make(
                //MUTADOR: Muta los datos a mi querer
            // se llama value la variable para guardar el nombre
            set: function($value){
                // retornará el nombre pero en minusculas para evitar
                return strtolower($value);
            },
            // Cuando busco ese dato me aparece en mayusculas la primera letra
            //aunque no en la base de datos

            // ACCESOR: Solo cambia las vistas
            get: function($value){
                return ucfirst($value);
            }
        );
    }

}
