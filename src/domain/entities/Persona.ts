export class Persona {
  private _id: number | null = null;
  private _nombre: string = '';
  private _apellidos: string = '';
  private _fechaNac: Date | null = null;
  private _direccion: string = '';
  private _telefono: string = '';
  private _foto: string | null = null;
  private _idDepartamento: number | null = null;

  constructor(
    id?: number,
    nombre?: string,
    apellidos?: string,
    fechaNac?: Date | string,
    direccion?: string,
    telefono?: string,
    foto?: string,
    idDepartamento?: number
  ) {
    if (id !== undefined) this._id = id;
    if (nombre) this._nombre = nombre;
    if (apellidos) this._apellidos = apellidos;
    if (fechaNac) this._fechaNac = fechaNac instanceof Date ? fechaNac : new Date(fechaNac);
    if (direccion) this._direccion = direccion;
    if (telefono) this._telefono = telefono;
    if (foto) this._foto = foto;
    if (idDepartamento !== undefined) this._idDepartamento = idDepartamento;
  }

  get id(): number | null { return this._id; }
  set id(v: number | null) { this._id = v; }

  get nombre(): string { return this._nombre; }
  set nombre(v: string) { this._nombre = v; }

  get apellidos(): string { return this._apellidos; }
  set apellidos(v: string) { this._apellidos = v; }

  get fechaNac(): Date | null { return this._fechaNac; }
  set fechaNac(v: Date | null) { this._fechaNac = v; }

  get direccion(): string { return this._direccion; }
  set direccion(v: string) { this._direccion = v; }

  get telefono(): string { return this._telefono; }
  set telefono(v: string) { this._telefono = v; }

  get foto(): string | null { return this._foto; }
  set foto(v: string | null) { this._foto = v; }

  get idDepartamento(): number | null { return this._idDepartamento; }
  set idDepartamento(v: number | null) { this._idDepartamento = v; }
}
