# Central de Pedidos — Conector IA

Endpoint privado de la página interna:

`/api/connector`

## Objetivo

Permitir que ChatGPT, n8n u otro agente pueda leer y actualizar la misma Central de Pedidos que usa La Colorada, sin escribir directamente sobre la interfaz web.

## Seguridad

- El endpoint exige un token privado en `Authorization: Bearer …` o `x-la-colorada-key`.
- El token vive como variable sensible `CENTRAL_CONNECTOR_TOKEN` en Vercel.
- La página y el repositorio no contienen el token.
- El endpoint delega la operación a la Edge Function `la-colorada-central-connector`.
- La Edge Function usa la credencial privada de Supabase sólo en servidor.

## Lectura

`GET /api/connector?mode=active`

Devuelve pedidos activos con sus items.

`GET /api/connector?mode=history`

Devuelve historial reciente con sus items.

## Escritura

Todas las escrituras usan `POST /api/connector` con JSON.

### Crear pedido

```json
{
  "action": "create_order",
  "cliente": "Cliente",
  "direccion": "Dirección",
  "horario_entrega": "12:30",
  "total": 0,
  "notas": "Precio pendiente",
  "items": [
    {
      "cantidad": 1,
      "descripcion": "Ensalada César",
      "precio_unitario": null,
      "notas": "Precio pendiente"
    }
  ]
}
```

### Actualizar datos o total

```json
{
  "action": "update_order",
  "id": 10,
  "total": 24000,
  "notas": "Total confirmado"
}
```

### Cambiar estado

```json
{
  "action": "update_state",
  "id": 10,
  "estado": "listo",
  "actor": "chat"
}
```

Estados válidos: `recibido`, `en_preparacion`, `listo`, `salio`, `entregado`, `cancelado`.

### Reemplazar items

```json
{
  "action": "replace_items",
  "id": 10,
  "items": [
    {
      "cantidad": 2,
      "descripcion": "Ensalada César",
      "precio_unitario": 12000
    }
  ]
}
```

## Regla operativa

La Central/Supabase es la fuente compartida de pedidos. La conversación puede capturar y estructurar un pedido, pero el pedido sólo se considera cargado cuando el conector devuelve éxito.
